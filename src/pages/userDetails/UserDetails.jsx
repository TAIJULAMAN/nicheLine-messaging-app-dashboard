import { ConfigProvider, Table, Input, Button, Modal, message } from "antd";
import { SearchOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { MdBlock, MdDelete } from "react-icons/md";
import { useGetAllUsersQuery, useUpdateUserMutation, useDeleteUserMutation } from "../../Redux/api/user/userApi";

function UserDetails() {
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: userData, isLoading } = useGetAllUsersQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const dataSource = userData?.data?.all_users?.map((user) => ({
    key: user?._id,
    fullName: user?.name,
    email: user?.email,
    joined: new Date(user?.createdAt).toLocaleDateString(),
    status: user?.status === "isProgress" ? "Active" : "Blocked",
    address: user?.location || "N/A",
    photo: user?.photo,
    role: "User", // Placeholder
    phone: "N/A", // Placeholder
    lastLogin: "N/A", // Placeholder
    subscription: "Free Plan", // Placeholder
  })) || [];


  const showViewModal = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const showBlockModal = (user) => {
    setSelectedUser(user);
    setIsBlockModalOpen(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      icon: <ExclamationCircleFilled />,
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await deleteUser(id).unwrap();
          message.success("User deleted successfully");
        } catch (error) {
          message.error("Failed to delete user");
        }
      },
    });
  };

  const confirmBlock = async () => {
    if (!selectedUser) return;
    try {
      const newStatus = selectedUser.status === 'Active' ? 'blocked' : 'isProgress';
      await updateUser({ id: selectedUser.key, data: { status: newStatus } }).unwrap();
      message.success(`User ${selectedUser.status === 'Active' ? 'Blocked' : 'Activated'} successfully`);
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
    { title: "Joined Date", dataIndex: "joined", key: "joined" },
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
            <FaRegEye />
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => handleDelete(record.key)}
            className="bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600 text-white"
          >
            <MdDelete />
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
            itemActiveBg: "#00E0B7",
            colorPrimary: "#0e1527", // Fixed pagination text color to match theme
            colorText: "#ffffff",
          },
          Modal: {
            contentBg: "#0e1527",
            headerBg: "#0e1527",
            titleColor: "#ffffff",
            colorText: "#ffffff",
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
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0E1527]">User Management</h1>
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
              total: userData?.data?.meta?.total,
              onChange: (p, l) => {
                setPage(p);
                setLimit(l);
              }
            }}
            scroll={{ x: "max-content" }}
            rowClassName="hover:bg-white/5 transition-colors"
          />

          {/* View Modal */}
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
                        <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium">{selectedUser.role}</span>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
                      <div className="bg-[#1f2937] p-4 rounded-xl">
                        <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-1">Email Address</h4>
                        <p className="text-lg font-medium">{selectedUser.email}</p>
                      </div>
                      <div className="bg-[#1f2937] p-4 rounded-xl">
                        <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-1">Address</h4>
                        <p className="text-lg font-medium">{selectedUser.address}</p>
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
                        <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-1">Subscription</h4>
                        <p className="text-base font-medium text-[#00E0B7]">{selectedUser.subscription}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Modal>

          {/* Block Modal */}
          <Modal
            title={<span className="text-white">{selectedUser?.status === "Active" ? "Block User" : "Unblock User"}</span>}
            open={isBlockModalOpen}
            onOk={confirmBlock}
            onCancel={() => setIsBlockModalOpen(false)}
            okText={selectedUser?.status === "Active" ? "Block" : "Unblock"}
            okButtonProps={{ danger: selectedUser?.status === "Active", style: selectedUser?.status !== "Active" ? { backgroundColor: "#28a745", borderColor: "#28a745" } : {} }}
          >
            <div className="flex items-center gap-3 text-white">
              <ExclamationCircleFilled className={selectedUser?.status === "Active" ? "text-red-500 text-2xl" : "text-green-500 text-2xl"} />
              <p>Are you sure you want to {selectedUser?.status === "Active" ? "block" : "unblock"} <span className="font-bold text-[#00E0B7]">{selectedUser?.fullName}</span>?</p>
            </div>
          </Modal>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default UserDetails;
