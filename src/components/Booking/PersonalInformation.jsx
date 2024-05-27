import { Checkbox, message } from 'antd';
import { useEffect, useState } from 'react';
import useAuthCheck from '../../redux/hooks/useAuthCheck';

const PersonalInformation = ({ handleChange, selectValue}) => {
    const { name, email, phone, reasonForVisit, description, address } = selectValue;
    const [checked, setChecked] = useState(false);
    const { data } = useAuthCheck();

    const onChange = (e) => {
        setChecked(e.target.checked);
    };

    useEffect(() =>{
        if(checked){
           
        }
    }, [checked, data])
    return (
        <form className="rounded p-3 mt-5" style={{ background: "#f8f9fa" }}>
            <div className="row">
                <Checkbox checked={checked} onChange={onChange}>
                    Allready Have an Account ?
                </Checkbox>

                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>name</label>
                        <input onChange={(e) => handleChange(e)} name='name' value={name && name} className="form-control" type="text" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>Email</label>
                        <input onChange={(e) => handleChange(e)} name='email' value={email && email} className="form-control" type="email" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>Phone</label>
                        <input onChange={(e) => handleChange(e)} name='phone' value={phone && phone} className="form-control" type="text" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>Address</label>
                        <input onChange={(e) => handleChange(e)} name='address' value={address && address} className="form-control" type="text" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>Reason For Visit</label>
                        <textarea rows={8} onChange={(e) => handleChange(e)} name='reasonForVisit' value={reasonForVisit && reasonForVisit} className="form-control" type="text" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>Description</label>
                        <textarea rows={8} onChange={(e) => handleChange(e)} name='description' value={description && description} className="form-control" type="text" />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PersonalInformation;