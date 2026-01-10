import { ConfigProvider, Table, Input, Button, Space, Modal, Form, Select, message } from "antd";
import { SearchOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useState, useMemo } from "react";
import { FaEdit, FaRegEye } from "react-icons/fa";
import { MdBlock } from "react-icons/md";

function UserDetails() {
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState(
    Array.from({ length: 45 }).map((_, i) => ({
      key: i.toString(),
      fullName: `User ${i + 1}`,
      role: i % 3 === 0 ? "Vendor" : i % 2 === 0 ? "Clients" : "User",
      email: `user${i + 1}@example.com`,
      phone: `+1 987 654 32${i % 10}${i % 10}`,
      joined: "2024-01-15",
      status: i % 5 === 0 ? "Blocked" : "Active",
      address: `${i + 1}23 Main St, New York, NY 10001`,
      lastLogin: "2024-03-20 10:30 AM",
      subscription: i % 2 === 0 ? "Premium Plan" : "Free Plan"
    }))
  );
  const showViewModal = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const showEditModal = (user) => {
    setEditUser({ ...user });
    form.setFieldsValue(user);
    setIsEditModalOpen(true);
  };

  const showBlockModal = (user) => {
    setSelectedUser(user);
    setIsBlockModalOpen(true);
  };

  const handleEditOk = () => {
    form.validateFields().then((values) => {
      setDataSource((prev) =>
        prev.map((r) => (r.key === editUser.key ? { ...r, ...values } : r))
      );
      message.success("User updated successfully");
      setIsEditModalOpen(false);
    });
  };

  const confirmBlock = () => {
    setDataSource((prev) =>
      prev.map((r) => r.key === selectedUser.key ? { ...r, status: "Blocked" } : r)
    );
    message.success("User blocked successfully");
    setIsBlockModalOpen(false);
  };
  const filteredData = useMemo(() => {
    return dataSource.filter((r) => {
      const matchesSearch = Object.values(r).some(val =>
        String(val).toLowerCase().includes(searchText.toLowerCase())
      );
      const matchesRole = roleFilter ? r.role === roleFilter : true;
      return matchesSearch && matchesRole;
    });
  }, [dataSource, searchText, roleFilter]);


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
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: 'User', value: 'User' },
        { text: 'Clients', value: 'Clients' },
        { text: 'Vendor', value: 'Vendor' },
      ],
      onFilter: (value, record) => record.role === value,
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone No", dataIndex: "phone", key: "phone" },
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
            onClick={() => showEditModal(record)}
            className="bg-blue-500"
          >
            <FaEdit />
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => showBlockModal(record)}
            style={{ backgroundColor: "#FF0000", borderColor: "#FF0000" }}
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
            dataSource={filteredData}
            columns={columns}
            pagination={{ pageSize: 8 }}
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
                      src={`https://avatar.iran.liara.run/public/${selectedUser.key}`}
                      alt={selectedUser.fullName}
                      className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
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
                        <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-1">Phone Number</h4>
                        <p className="text-lg font-medium">{selectedUser.phone}</p>
                      </div>
                      <div className="bg-[#1f2937] p-4 rounded-xl md:col-span-2">
                        <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-1">Address</h4>
                        <p className="text-lg font-medium">{selectedUser.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Account Details */}
                  <div>
                    <h3 className="text-[#00E0B7] text-lg font-semibold mb-3 border-b border-gray-700 pb-2">Account Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
                      <div className="bg-[#1f2937] p-4 rounded-xl">
                        <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-1">Joined Date</h4>
                        <p className="text-base font-medium">{selectedUser.joined}</p>
                      </div>
                      <div className="bg-[#1f2937] p-4 rounded-xl">
                        <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-1">Last Login</h4>
                        <p className="text-base font-medium">{selectedUser.lastLogin}</p>
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


          {/* Edit Modal */}
          <Modal
            title="Edit User"
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
              <Form.Item name="role" label={<span className="text-white">Role</span>} rules={[{ required: true }]}>
                <Select>
                  <Select.Option value="User">User</Select.Option>
                  <Select.Option value="Clients">Clients</Select.Option>
                  <Select.Option value="Vendor">Vendor</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="phone" label={<span className="text-white">Phone</span>} rules={[{ required: true }]}>
                <Input className="text-white" />
              </Form.Item>
            </Form>
          </Modal>

          {/* Block Modal */}
          <Modal
            title={<span className="text-white">Block User</span>}
            open={isBlockModalOpen}
            onOk={confirmBlock}
            onCancel={() => setIsBlockModalOpen(false)}
            okText="Block"
            okButtonProps={{ danger: true }}
          >
            <div className="flex items-center gap-3 text-white">
              <ExclamationCircleFilled className="text-red-500 text-2xl" />
              <p>Are you sure you want to block <span className="font-bold text-[#00E0B7]">{selectedUser?.fullName}</span>?</p>
            </div>
          </Modal>

        </div>
      </div>
    </ConfigProvider>
  );
}

export default UserDetails;
