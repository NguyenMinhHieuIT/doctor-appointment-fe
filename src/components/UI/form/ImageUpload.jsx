import { FaCloudUploadAlt } from "react-icons/fa";

const ImageUpload = ({ setSelectedImage, setFile }) => {
  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const reader = new FileReader();
      const file = files[0];
      setFile(file);
      reader.onload = () =>{
        setSelectedImage(reader.result);
      }
      reader.readAsDataURL(file);
    }
  }

  return (
    <>
      <div className="change-photo-btn">
        <span className="d-flex align-items-center justify-content-center gap-2"><FaCloudUploadAlt className="icon" style={{ fontSize: '2rem' }} /> Tải ảnh lên</span>
        <input type="file" className="upload" onChange={handleFileChange} />
      </div>
      <div>
        <small className="form-text text-muted">Định dạng JPG, GIF hoặc PNG. Kích thước tối đa 2MB</small>
      </div>
    </>
  );
};
export default ImageUpload;