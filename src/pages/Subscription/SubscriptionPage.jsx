import { ConfigProvider, Table, Button, Modal, Form, Input, Select, message, Space } from "antd";
import { PlusOutlined, SearchOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const SubscriptionPage = () => {
    const [plans, setPlans] = useState([
        { key: '1', name: "Free", price: "0", duration: "Lifetime", status: "Active" },
        { key: '2', name: "1 Year", price: "9.99", duration: "1 Year", status: "Active" },
        { key: '3', name: "3 Year", price: "24.99", duration: "3 Years", status: "Active" },
    ]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [form] = Form.useForm();

    // --- Add Plan ---
    const showAddModal = () => {
        form.resetFields();
        setIsAddModalOpen(true);
    };

    const handleAddOk = () => {
        form.validateFields().then((values) => {
            const newPlan = {
                key: Date.now().toString(),
                ...values,
            };
            setPlans([...plans, newPlan]);
            message.success("Plan added successfully");
            setIsAddModalOpen(false);
        });
    };

    // --- Edit Plan ---
    const showEditModal = (record) => {
        setSelectedPlan(record);
        form.setFieldsValue(record);
        setIsEditModalOpen(true);
    };

    const handleEditOk = () => {
        form.validateFields().then((values) => {
            const updatedPlans = plans.map(p =>
                p.key === selectedPlan.key ? { ...p, ...values } : p
            );
            setPlans(updatedPlans);
            message.success("Plan updated successfully");
            setIsEditModalOpen(false);
        });
    };

    // --- Delete Plan ---
    const showDeleteModal = (record) => {
        setSelectedPlan(record);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteOk = () => {
        const filteredPlans = plans.filter(p => p.key !== selectedPlan.key);
        setPlans(filteredPlans);
        message.success("Plan deleted successfully");
        setIsDeleteModalOpen(false);
    };

    const columns = [
        { title: "Plan Name", dataIndex: "name", key: "name" },
        {
            title: "Price ($)",
            dataIndex: "price",
            key: "price",
            render: (price) => <span className="font-semibold">${price}</span>
        },
        { title: "Duration", dataIndex: "duration", key: "duration" },
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
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#0E1527]">Subscription Plans</h1>
                    <p className="text-gray-500">Manage your subscription packages</p>
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={showAddModal}
                    style={{ backgroundColor: "#00E0B7", borderColor: "#00E0B7", height: '40px' }}
                >
                    Add New Plan
                </Button>
            </div>

            <div className="bg-[#0e1527] rounded-2xl p-6 shadow-lg shadow-gray-200/50">
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
                            },
                            Input: {
                                colorBgContainer: "#1f2937",
                                colorText: "#ffffff",
                                activeBorderColor: "#00E0B7",
                            }
                        },
                    }}
                >
                    <Table
                        dataSource={plans}
                        columns={columns}
                        pagination={false}
                        rowClassName="hover:bg-white/5 transition-colors"
                    />

                    {/* Add/Edit Modal */}
                    <Modal
                        title={<span className="text-white">{isAddModalOpen ? "Add New Plan" : "Edit Plan"}</span>}
                        open={isAddModalOpen || isEditModalOpen}
                        onOk={isAddModalOpen ? handleAddOk : handleEditOk}
                        onCancel={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                        okText="Save"
                        okButtonProps={{ style: { backgroundColor: "#00E0B7", borderColor: "#00E0B7" } }}
                    >
                        <Form form={form} layout="vertical" className="mt-4">
                            <Form.Item name="name" label={<span className="text-white">Plan Name</span>} rules={[{ required: true }]}>
                                <Input className="text-white" placeholder="e.g. Premium" />
                            </Form.Item>
                            <div className="grid grid-cols-2 gap-4">
                                <Form.Item name="price" label={<span className="text-white">Price ($)</span>} rules={[{ required: true }]}>
                                    <Input type="number" className="text-white" placeholder="99" />
                                </Form.Item>
                                <Form.Item name="duration" label={<span className="text-white">Duration</span>} rules={[{ required: true }]}>
                                    <Input className="text-white" placeholder="e.g. 1 Year" />
                                </Form.Item>
                            </div>
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
                        title={<span className="text-white">Delete Plan</span>}
                        open={isDeleteModalOpen}
                        onOk={handleDeleteOk}
                        onCancel={() => setIsDeleteModalOpen(false)}
                        okText="Delete"
                        okButtonProps={{ danger: true }}
                    >
                        <div className="flex items-center gap-3 text-white">
                            <ExclamationCircleFilled className="text-red-500 text-2xl" />
                            <p>Are you sure you want to delete <span className="font-bold text-[#00E0B7]">{selectedPlan?.name}</span>?</p>
                        </div>
                    </Modal>

                </ConfigProvider>
            </div>
        </div>
    );
};

export default SubscriptionPage;
