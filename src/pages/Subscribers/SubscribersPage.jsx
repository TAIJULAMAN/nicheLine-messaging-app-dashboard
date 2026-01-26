import { ConfigProvider, Table, Input, Button, Modal, message } from "antd";
import { SearchOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import { useGetAllSubscribersQuery, useUpdateSubscriberMutation } from "../../Redux/api/subscribers/subscribersApi";

const SubscribersPage = () => {
    const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const { data: subscriberData, isLoading } = useGetAllSubscribersQuery({
        page,
        limit,
        searchTerm: searchText,
    });

    const [updateSubscriber] = useUpdateSubscriberMutation();

    const dataSource = subscriberData?.data?.allActiveSubscriber
        ?.filter((sub) =>
            sub?.userId?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
            sub?.userId?.email?.toLowerCase().includes(searchText.toLowerCase())
        )
        ?.map((sub) => ({
            key: sub._id,
            fullName: sub.userId?.name,
            role: sub.typesubscription === "paid" ? "Premium User" : "Standard User",
            email: sub.userId?.email,
            plan: sub.typesubscription.charAt(0).toUpperCase() + sub.typesubscription.slice(1), // Capitalize
            status: sub.isActive === false ? "Inactive" : "Active",
            isActive: sub.isActive, // Store original boolean for logic
            joined: new Date(sub.createdAt).toLocaleDateString(),
            photo: sub.userId?.photo,
        })) || [];

    const showBlockModal = (record) => {
        setSelectedUser(record);
        setIsBlockModalOpen(true);
    };

    const showViewModal = (record) => {
        setSelectedUser(record);
        setIsViewModalOpen(true);
    };

    const confirmBlock = async () => {
        if (!selectedUser) return;
        try {
            await updateSubscriber({
                id: selectedUser.key,
                data: { isActive: !selectedUser.isActive } // Matches { "isActive": boolean }
            }).unwrap();
            message.success(`Subscriber ${selectedUser.status === 'Active' ? 'Deactivated' : 'Activated'} successfully`);
            setIsBlockModalOpen(false);
        } catch (error) {
            message.error("Failed to update status");
        }
    };

    const columns = [
        {
            title: "No",
            key: "no",
            width: 70,
            render: (_, _r, index) => (page - 1) * limit + index + 1,
        },
        {
            title: "Full Name",
            dataIndex: "fullName",
            key: "fullName",
            render: (value) => (
                <div className="flex items-center gap-3">
                    <span className="font-medium text-white">{value}</span>
                </div>
            ),
        },
        { title: "Email", dataIndex: "email", key: "email" },
        {
            title: "Plan",
            dataIndex: "plan",
            key: "plan",
            filters: [
                { text: 'Free', value: 'Free' },
                { text: 'Paid', value: 'Paid' },
            ],
            onFilter: (value, record) => record.plan === value,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status === "Active" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                    }`}>
                    {status}
                </span>
            )
        },
        { title: "Joined Date", dataIndex: "joined", key: "joined" },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <div className="flex items-center gap-2">
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => showViewModal(record)}
                        style={{ backgroundColor: "#00E0B7", borderColor: "#00E0B7" }}
                    >
                        <FaEye />
                    </Button>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => showBlockModal(record)}
                        style={{ backgroundColor: record.status === 'Active' ? "#FF0000" : "#28a745", borderColor: record.status === 'Active' ? "#FF0000" : "#28a745" }}
                    >
                        <MdBlock />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerBg: "#00E0B7",
                        headerColor: "#0E1527",
                        cellFontSize: 16,
                        headerSplitColor: "#00e0b7",
                        colorBgBase: "#0e1527",
                        colorText: "#ffffff",
                        colorBgContainer: "#0e1527",
                        borderColor: "#1f2937",
                        rowHoverBg: "#1f2937",
                    },
                    Pagination: {
                        colorPrimary: "#00E0B7",
                        colorPrimaryHover: "#00E0B7",
                        colorText: "#00E0B7",
                        colorTextActive: "#00E0B7",
                    },
                    Modal: {
                        contentBg: "#0e1527",
                        headerBg: "#0e1527",
                        titleColor: "#ffffff",
                        colorText: "#ffffff",
                    },
                    Select: {
                        selectorBg: "#1f2937",
                        colorText: "#ffffff",
                        optionSelectedBg: "#00E0B7",
                        colorBorder: "#374151"
                    },
                    Input: {
                        colorBgContainer: "#1f2937",
                        colorText: "#ffffff",
                        activeBorderColor: "#00E0B7",
                        colorBorder: "#374151",
                        colorTextPlaceholder: "#9ca3af"
                    },
                    Button: {
                        defaultGhostColor: "#00E0B7",
                    }
                },
            }}
        >
            <div className="space-y-5">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#0E1527]">All Subscribers</h1>
                    </div>
                    <Input
                        placeholder="Search users..."
                        prefix={<SearchOutlined className="text-gray-400" />}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 300, height: '40px', borderRadius: '8px' }}
                    />
                </div>

                <div className="bg-[#0e1527] rounded-2xl p-6 shadow-lg shadow-gray-200/50">

                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        loading={isLoading}
                        pagination={{
                            current: page,
                            pageSize: limit,
                            total: subscriberData?.data?.meta?.total,
                            onChange: (p, l) => {
                                setPage(p);
                                setLimit(l);
                            }
                        }}
                        scroll={{ x: "max-content" }}
                        rowClassName="hover:bg-white/5 transition-colors"
                    />

                    {/* Block/Unblock Modal */}
                    <Modal
                        title={<span className="text-white">{selectedUser?.status === "Active" ? "Deactivate Subscriber" : "Activate Subscriber"}</span>}
                        open={isBlockModalOpen}
                        onOk={confirmBlock}
                        onCancel={() => setIsBlockModalOpen(false)}
                        okText={selectedUser?.status === "Active" ? "Deactivate" : "Activate"}
                        okButtonProps={{ danger: selectedUser?.status === "Active", style: selectedUser?.status !== "Active" ? { backgroundColor: "#28a745", borderColor: "#28a745" } : {} }}
                    >
                        <div className="flex items-center gap-3 text-white">
                            <ExclamationCircleFilled className={selectedUser?.status === "Active" ? "text-red-500 text-2xl" : "text-green-500 text-2xl"} />
                            <p>Are you sure you want to {selectedUser?.status === "Active" ? "deactivate" : "activate"} <span className="font-bold text-[#00E0B7]">{selectedUser?.fullName}</span>?</p>
                        </div>
                    </Modal>

                    {/* View Details Modal */}
                    <Modal
                        open={isViewModalOpen}
                        onCancel={() => setIsViewModalOpen(false)}
                        footer={null}
                        centered
                        width={800}
                        className="user-view-modal"
                    >
                        {selectedUser && (
                            <div className="relative">
                                <div className="bg-gradient-to-r from-[#00e0b7] to-[#0e1527] p-8 -m-6 mb-8 rounded-t-lg">
                                    <div className="flex flex-col md:flex-row items-center gap-6">
                                        <img
                                            src={selectedUser.photo ? `${import.meta.env.VITE_BASE_URL || ''}/${selectedUser.photo}` : `https://avatar.iran.liara.run/public/${selectedUser.key}`}
                                            alt={selectedUser.fullName}
                                            className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                                            onError={(e) => { e.target.src = `https://avatar.iran.liara.run/public/${selectedUser.key}`; }}
                                        />
                                        <div className="text-white text-center md:text-left">
                                            <h2 className="text-4xl font-bold mb-2">{selectedUser.fullName}</h2>
                                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                                <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium">{selectedUser.plan}</span>
                                                <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${selectedUser.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                                                    {selectedUser.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Personal Information */}
                                    <div>
                                        <h3 className="text-[#00E0B7] text-lg font-semibold mb-3 border-b border-gray-700 pb-2">Personal Information</h3>
                                        <div className="grid grid-cols-1 text-white">
                                            <div className="bg-[#1f2937] p-4 rounded-xl">
                                                <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-1">Email Address</h4>
                                                <p className="text-lg font-medium">{selectedUser.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Account Details */}
                                    <div>
                                        <h3 className="text-[#00E0B7] text-lg font-semibold mb-3 border-b border-gray-700 pb-2">Account Details</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
                                            <div className="bg-[#1f2937] p-4 rounded-xl">
                                                <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-1">Joined Date</h4>
                                                <p className="text-base font-medium">{selectedUser.joined}</p>
                                            </div>

                                            <div className="bg-[#1f2937] p-4 rounded-xl">
                                                <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-1">Plan</h4>
                                                <p className="text-base font-medium text-[#00E0B7]">{selectedUser.plan}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Modal>

                </div>
            </div>
        </ConfigProvider >
    );
};

export default SubscribersPage;
