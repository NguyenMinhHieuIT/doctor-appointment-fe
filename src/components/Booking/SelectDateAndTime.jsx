import moment from 'moment'
import { DatePicker } from 'antd';

const SelectDateAndTime = ({ content, handleDateChange, disabledDateTime, selectedDate, dContent, selectTimeStart, selectTimeEnd }) => {
    return (
        <div style={{ marginTop: '5rem'}}>
            <div>
                {content}
            </div>

            <dir className="row">

                <div className="col-md-5 col-sm-12 mt-3">
                    <h5 className='text-title mb-3'>Chọn ngày khám</h5>
                    <DatePicker
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={disabledDateTime}
                        open={true}
                        onChange={handleDateChange}
                    />
                </div>

                <div className="col-md-7 col-sm-12 mt-3">
                    {selectedDate && <h5 className='text-title mb-3'>{selectedDate && moment(selectedDate).format('LL')}
                        {selectTimeStart && selectTimeEnd && ` / ${selectTimeStart} - ${selectTimeEnd}`}</h5> }
                    <div className="date-card rounded">
                        <div className="row text-center mt-3">
                            {
                                !selectedDate ? <h5 className='text-title d-flex justify-content-center align-items-center mt-5'>Hãy chọn ngày khám trước</h5> :
                                    dContent
                            }
                        </div>
                    </div>
                </div>
            </dir>
        </div>
    )
}

export default SelectDateAndTime;