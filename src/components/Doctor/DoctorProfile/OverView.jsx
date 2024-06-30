import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBriefcase } from "react-icons/fa";

const OverView = ({data}) => {
    return (
        <div className="col-md-12 col-lg-9">
            <div className='mb-3'>
                <h5 className='overview-text'>Về tôi </h5>
                <p className='text-secondary'>{data?.description}.</p>
            </div>

            <div>
                <h5 className='overview-text'>Giáo dục</h5>

                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#2e81c4', color: '#000' }}
                        contentArrowStyle={{ borderRight: '7px solid  #2e81c4' }}
                        date={"Năm tốt nghiệp: " + data?.completionYear}
                        iconStyle={{ background: '#2e81c4', color: '#fff' }}
                        icon={<FaBriefcase />}
                    >
                        <h5 className="text-white">{ data?.college }</h5>
                        <h6 className="text-white">{ data?.degree }</h6>
                        <p style={{ fontSize: '14px' }}>
                        Có kiến thức: Định hướng sáng tạo, Trải nghiệm người dùng, Thiết kế trực quan, Quản lý bệnh nhân, Lãnh đạo nhóm
                        </p>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </div>
        </div>
    )
}
export default OverView;