import moment from "moment";
import { DatePicker } from "antd";
import { useGetAllTimeSlotQuery } from "../../redux/api/timeSlotApi";
import { Days } from "../../constant/global";

const SelectDateAndTime = ({
  content,
  handleDateChange,
  disabledDateTime,
  selectedDate,
  dContent,
  selectTimeStart,
  selectTimeEnd,
  doctorId
}) => {
    const {data, isLoading, isError, isSuccess} = useGetAllTimeSlotQuery(doctorId);
    const dataMap = 
    <>
        {
            data?.map(item => {
                return <p> {Days[item.day] + '( ' + item.day + ' )'}</p>
            } )
        }     
    </>
  return (
    <div style={{ marginTop: "5rem" }}>
      <dir className="row">
        <div className="col-md-3 col-sm-12">
          <div>{content}</div>
          <div>
           <b>Bác sĩ có lịch làm việc vào: <br /> <br /> </b>  
            {
                dataMap
            }
          </div>
        </div>

        <div className="col-md-4 col-sm-12">
          <h5 className="text-title mb-3">Chọn ngày khám</h5>
          <DatePicker
            format="YYYY-MM-DD"
            disabledDate={disabledDateTime}
            open={true}
            onChange={handleDateChange}
          />
        </div>

        <div className="col-md-5 col-sm-12">
          {selectedDate && (
            <h5 className="text-title mb-3">
              {selectedDate && moment(selectedDate).format("LL")}
              {selectTimeStart &&
                selectTimeEnd &&
                ` / ${selectTimeStart} - ${selectTimeEnd}`}
            </h5>
          )}
          <div className="date-card rounded">
            <div className="row text-center mt-3">
              {!selectedDate ? (
                <h5 className="text-title d-flex justify-content-center align-items-center mt-5">
                  Hãy chọn ngày khám trước
                </h5>
              ) : (
                dContent
              )}
            </div>
          </div>
        </div>
      </dir>
    </div>
  );
};

export default SelectDateAndTime;
