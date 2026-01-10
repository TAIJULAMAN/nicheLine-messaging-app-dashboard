import { ConfigProvider, Table, Input, Button, Space, Modal, Form, Select, message } from "antd";
import { SearchOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useState, useMemo } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const SubscribersPage = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [form] = Form.useForm();

    const initialData = useMemo(() => Array.from({ length: 45 }).map((_, i) => {
        const plans = ["Free", "1 Year", "3 Year"];
        return {
            key: i,
            fullName: `User ${i + 1}`,
            role: i % 3 === 0 ? "Premium User" : "Standard User",
            email: `user${i + 1}@example.com`,
            plan: plans[i % plans.length],
            status: i % 4 === 0 ? "Inactive" : "Active",
            joined: "2024-01-15",
        };
    }), []);

    const [dataSource, setDataSource] = useState(initialData);

    const filteredData = useMemo(() => {
        return dataSource.filter((r) => {
            return Object.values(r).some(val =>
                String(val).toLowerCase().includes(searchText.toLowerCase())
            );
        });
    }, [dataSource, searchText]);

    const showEditModal = (record) => {
        setSelectedUser(record);
        form.setFieldsValue(record);
        setIsEditModalOpen(true);
    };

    const showDeleteModal = (record) => {
        setSelectedUser(record);
        setIsDeleteModalOpen(true);
    };

    const handleEditOk = () => {
        form.validateFields().then((values) => {
            setDataSource((prev) =>
                prev.map((item) => item.key === selectedUser.key ? { ...item, ...values } : item)
            );
            message.success("Subscriber updated successfully");
            setIsEditModalOpen(false);
        });
    };

    const handleDeleteOk = () => {
        setDataSource((prev) => prev.filter((item) => item.key !== selectedUser.key));
        message.success("Subscriber deleted successfully");
        setIsDeleteModalOpen(false);
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => confirm()}
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90, backgroundColor: "#00E0B7", borderColor: "#00E0B7" }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => clearFilters && clearFilters()} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? "#00E0B7" : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    });

    const columns = [
        {
            title: "No",
            key: "no",
            width: 70,
            render: (_, _r, index) => index + 1,
        },
        {
            title: "Full Name",
            dataIndex: "fullName",
            key: "fullName",
            ...getColumnSearchProps("fullName"),
            render: (value, record) => (
                <div className="flex items-center gap-3">
                    <img
                        src={`https://avatar.iran.liara.run/public/${record.key}`}
                        className="w-10 h-10 object-cover rounded-full"
                        alt="User Avatar"
                    />
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
                { text: '1 Year', value: '1 Year' },
                { text: '3 Year', value: '3 Year' },
            ],
            onFilter: (value, record) => record.plan.indexOf(value) === 0,
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
        { title: "Joined Date", dataIndex: "joined", key: "joined", sorter: (a, b) => new Date(a.joined) - new Date(b.joined) },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <div className="flex items-center gap-2">
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => showEditModal(record)}
                        style={{ backgroundColor: "#00E0B7", borderColor: "#00E0B7" }}
                    >
                        <FaEdit />
                    </Button>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => showDeleteModal(record)}
                        style={{ backgroundColor: "#FF0000", borderColor: "#FF0000" }}
                    >
                        <FaTrash />
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
                        itemActiveBg: "#00E0B7",
                        colorPrimary: "#0e1527",
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
                        <p className="text-gray-500">Manage and view all your subscribers</p>
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
                        dataSource={filteredData}
                        columns={columns}
                        pagination={{ pageSize: 8 }}
                        scroll={{ x: "max-content" }}
                        rowClassName="hover:bg-white/5 transition-colors"
                    />

                    {/* Edit Modal */}
                    <Modal
                        title="Edit Subscriber"
                        open={isEditModalOpen}
                        onOk={handleEditOk}
                        onCancel={() => setIsEditModalOpen(false)}
                        okText="Save"
                        okButtonProps={{ style: { backgroundColor: "#00E0B7", borderColor: "#00E0B7" } }}
                    >
                        <Form form={form} layout="vertical" className="mt-4">
                            <Form.Item name="fullName" label={<span className="text-white">Full Name</span>} rules={[{ required: true }]}>
                                <Input className="text-white" />
                            </Form.Item>
                            <Form.Item name="email" label={<span className="text-white">Email</span>} rules={[{ required: true, type: 'email' }]}>
                                <Input disabled className="text-white" />
                            </Form.Item>
                            <Form.Item name="plan" label={<span className="text-white">Plan</span>} rules={[{ required: true }]}>
                                <Select>
                                    <Select.Option value="Free">Free</Select.Option>
                                    <Select.Option value="1 Year">1 Year</Select.Option>
                                    <Select.Option value="3 Year">3 Year</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="status" label={<span className="text-white">Status</span>} rules={[{ required: true }]}>
                                <Select>
                                    <Select.Option value="Active">Active</Select.Option>
                                    <Select.Option value="Inactive">Inactive</Select.Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </Modal>

                    {/* Delete Modal */}
                    <Modal
                        title={<span className="text-white">Delete Subscriber</span>}
                        open={isDeleteModalOpen}
                        onOk={handleDeleteOk}
                        onCancel={() => setIsDeleteModalOpen(false)}
                        okText="Delete"
                        okButtonProps={{ danger: true }}
                    >
                        <div className="flex items-center gap-3 text-white">
                            <ExclamationCircleFilled className="text-red-500 text-2xl" />
                            <p>Are you sure you want to delete <span className="font-bold text-[#00E0B7]">{selectedUser?.fullName}</span>?</p>
                        </div>
                    </Modal>
                </div>
            </div>
        </ConfigProvider >
    );
};

export default SubscribersPage;
