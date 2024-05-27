import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBriefcase } from "react-icons/fa";

const OverView = ({data}) => {
    console.log(data)
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
            <div>
                <h5 className='overview-text'>Services</h5>
                <ul>
                    <li>Tooth cleaning </li>
                    <li>Root Canal Therapy</li>
                    <li>Implants</li>
                    <li>Composite Bonding</li>
                    <li>Fissure Sealants</li>
                    <li>Surgical Extractions</li>
                </ul>
            </div>
            <div>
                <h5 className='overview-text'>Specializations</h5>
                <ul className="clearfix">
                    <li>Children Care</li>
                    <li>Dental Care</li>
                    <li>Oral and Maxillofacial Surgery </li>
                    <li>Orthodontist</li>
                    <li>Periodontist</li>
                    <li>Prosthodontics</li>
                </ul>
            </div>
        </div>
    )
}
export default OverView;