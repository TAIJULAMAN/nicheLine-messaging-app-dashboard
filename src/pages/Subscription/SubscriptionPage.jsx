import { Spin, Card, Button, List, Modal, Form, Input, message } from "antd";
import { CheckCircleFilled, EditOutlined } from "@ant-design/icons";
import { useGetAllSubscriptionsQuery, useUpdateSubscriptionMutation } from "../../Redux/api/subscribers/subscribersApi";
import { useState } from "react";

const SubscriptionPage = () => {
    const { data: subscriptionData, isLoading } = useGetAllSubscriptionsQuery();
    const [updateSubscription] = useUpdateSubscriptionMutation();
    const planData = subscriptionData?.data?.all_subscription_list?.[0];

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingKey, setEditingKey] = useState(null);
    const [form] = Form.useForm();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Spin size="large" />
            </div>
        );
    }

    if (!planData) {
        return <div className="text-white text-center">No subscription plan details available.</div>;
    }

    const { _id, description, subscriptionType30, subscriptionType15, subscriptionPrice } = planData;

    const showEditModal = (key, data) => {
        setEditingKey(key);
        form.setFieldsValue({
            title: data.title,
            price: data.price
        });
        setIsEditModalOpen(true);
    };

    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();
            const currentPlanData = planData[editingKey];
            const updatedPlanData = {
                ...currentPlanData,
                title: values.title,
                price: values.price,
            };

            // Synchronize subscriptionPrice
            let updatedSubscriptionPrice = [...subscriptionPrice];
            if (editingKey === 'subscriptionType30' && updatedSubscriptionPrice.length > 0) {
                updatedSubscriptionPrice[0] = {
                    ...updatedSubscriptionPrice[0],
                    pricetype: `Upgrade to ${values.price}/year`
                };
            } else if (editingKey === 'subscriptionType15' && updatedSubscriptionPrice.length > 1) {
                updatedSubscriptionPrice[1] = {
                    ...updatedSubscriptionPrice[1],
                    pricetype: `Upgrade to ${values.price} for a year`
                };
            }

            await updateSubscription({
                id: _id,
                data: {
                    [editingKey]: updatedPlanData,
                    subscriptionPrice: updatedSubscriptionPrice
                }
            }).unwrap();

            message.success("Plan updated successfully");
            setIsEditModalOpen(false);
        } catch (error) {
            message.error("Failed to update plan");
        }
    };

    const renderPlanCard = (typeData, discount, key) => (
        <div className="flex-1 bg-[#1f2937] rounded-xl p-6 border border-gray-700 hover:border-[#00E0B7] transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-4 right-4 z-20">
                <Button
                    type="text"
                    icon={<EditOutlined className="text-white text-lg" />}
                    onClick={() => showEditModal(key, typeData)}
                />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{typeData?.title}</h3>
            <p className="text-[#00E0B7] text-3xl font-bold mb-4">{typeData?.price}</p>

            <List
                dataSource={typeData?.features}
                renderItem={(item) => (
                    <List.Item className="border-b-0 px-0 py-2">
                        <div className="flex items-start gap-3 text-gray-300">
                            <CheckCircleFilled className="text-[#00E0B7] mt-1 shrink-0" />
                            <span>{item}</span>
                        </div>
                    </List.Item>
                )}
            />
            <Button
                type="primary"
                block
                className="mt-6 font-semibold h-10"
                style={{
                    backgroundColor: discount === "30%" ? "#00E0B7" : "transparent",
                    color: discount === "30%" ? "#0E1527" : "#00E0B7",
                    borderColor: "#00E0B7"
                }}
            >
                Choose {discount} Off
            </Button>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-4">
                <p className="text-gray-400 text-lg leading-relaxed">
                    {description}
                </p>
            </div>

            <div className="bg-[#0e1527] rounded-3xl p-8 shadow-2xl border border-gray-800 relative overflow-hidden">
                {/* Background decorative glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[#00E0B7]/5 blur-3xl rounded-full -z-0 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-center items-stretch">
                    {/* 15% Plan */}
                    {renderPlanCard(subscriptionType15, "15%", "subscriptionType15")}

                    {/* 30% Plan */}
                    {renderPlanCard(subscriptionType30, "30%", "subscriptionType30")}
                </div>
            </div>

            <Modal
                title="Edit Plan Details"
                open={isEditModalOpen}
                onOk={handleUpdate}
                onCancel={() => setIsEditModalOpen(false)}
                okText="Update"
                okButtonProps={{ style: { backgroundColor: "#00E0B7", borderColor: "#00E0B7" } }}
            >
                <Form form={form} layout="vertical" className="mt-4">
                    <Form.Item
                        name="title"
                        label="Plan Title"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default SubscriptionPage;
