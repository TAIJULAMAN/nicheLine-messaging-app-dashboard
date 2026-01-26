import { ConfigProvider, Table } from "antd";
import { useGetAllUsersQuery } from "../../Redux/api/user/userApi";

const RecentUsers = () => {
  const { data: userData, isLoading } = useGetAllUsersQuery({
    page: 1,
    limit: 5,
  });

  const dataSource = userData?.data?.all_users?.map((user) => ({
    key: user._id,
    fullName: user.name,
    email: user.email,
    joined: new Date(user.createdAt).toLocaleDateString(),
    status: user.status === "isProgress" ? "Active" : "Blocked",
  })) || [];


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
  ];

  return (
    <div className="bg-[#0e1527] rounded-2xl p-6 shadow-lg shadow-gray-200/50">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Recently Joined Users</h2>
      </div>
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
          },
        }}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={isLoading}
          pagination={false}
          scroll={{ x: "max-content" }}
          rowClassName="hover:bg-white/5 transition-colors"
        />
      </ConfigProvider>
    </div>
  );
};

export default RecentUsers;
