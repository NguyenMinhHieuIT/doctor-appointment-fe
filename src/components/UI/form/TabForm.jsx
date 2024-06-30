import React from 'react'
import { daysArray, Days } from '../../../constant/global'
import { FaEdit, FaPlus } from "react-icons/fa";
import { Button, Tabs } from 'antd';
const { TabPane } = Tabs;
const TabForm = ({ handleOnSelect, content, data, showEditModal, showModal }) => {
    return (
        <Tabs defaultActiveKey="sunday" className="mb-3" onChange={handleOnSelect}>
            { Object.keys(Days).map((item) => (
                <TabPane tab={Days[item].toUpperCase()} key={item}>
                    <div className='d-flex justify-content-between'>
                        {content}
                        <Button type="primary" shape="circle" onClick={data && data?.length > 0 ? showEditModal : showModal}>
                            {data && data?.length > 0 ? <FaEdit /> : <FaPlus />}
                        </Button>
                    </div>
                </TabPane>
            ))}
        </Tabs>
    )
}

export default TabForm