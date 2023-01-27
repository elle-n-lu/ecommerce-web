import React, { useState } from "react";
import { ImPencil } from "react-icons/im";
import axios from "axios";
import {
  Account,
  useEditAvatarMutation,
} from "../features/products/productSlice";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import AvaImg from "./AvaImg";
import { useNavigate } from "react-router-dom";
interface avatarProps {
  data: Account;
}

const Avatar: React.FC<avatarProps> = ({ data }) => {
  const [editAvatar] = useEditAvatarMutation();
  const defaultSrc = data.avatarUrl;
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<any>();
  const [image, setImage] = useState(defaultSrc);
  const [click, setClick] = useState(false);

  const navigate = useNavigate();
  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
    setClick(true);
  };
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
    setClick(false);
  };
  const submitAc = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const filename = "username" as string;

    e.preventDefault();
    if (cropData === "#") {
      return;
      alert("click upload avatar");
    }
    const file = await fetch(cropData)
      .then((res) => res.blob())
      .then((blob) => {
        return new File([blob], filename + ".jpg", {
          type: "image/png,image/jpg",
        });
      });
    const formData = new FormData();
    formData.append("image", file);
    const step1 = await axios
      .post("http://127.0.0.1:5000/upload", formData, {})
      .catch((error) => console.log(error.message));
    if (step1) {
      const res = await editAvatar({
        id: data._id as string,
        avatarUrl: step1.data.imageUrl,
      });
      if (res) {
        navigate(0);
      }
    }
  };

  return (
    <form className="  self-center" onSubmit={(e: any) => submitAc(e)}>
      <div
        className="relative rounded-full border mr-28 hover:shadow-lg"
        style={{ width: "256px", height: "256px", objectFit: "cover" }}
      >
        <AvaImg id={data._id as string} />
        <button className="absolute top-4 -left-2 rounded-md bg-white border text-sm p-2">
          <ImPencil className=" mr-2 " />
          Edit
        </button>
        <div
          className=" absolute -left-14 top-16 mt-2 text-sm border bg-white border-slate-500 rounded-lg"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div style={{ width: "100%" }}>
            <label
              className=" inline-block my-2 hover:bg-slate-300"
              htmlFor="file-input"
            >
              upload avatar..
            </label>
            <input
              id="file-input"
              type="file"
              style={{ display: "none" }}
              onChange={onChange}
            />
            {click && (
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative md:w-1/2 w-full">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg justify-between flex flex-col md:w-full bg-white outline-none focus:outline-none py-2 px-4 xl:py-24 xl:px-64 ">
                    <Cropper
                      style={{ height: 400, width: "100%" }}
                      zoomTo={0.5}
                      initialAspectRatio={1}
                      preview=".img-preview"
                      src={image}
                      viewMode={1}
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                      onInitialized={(instance) => {
                        setCropper(instance);
                      }}
                      guides={true}
                    />
                    <div className=" flex mx-6">
                      <button
                        className="text-red-500 border w-1/3 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mt-8 mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={getCropData}
                      >
                        crop
                      </button>
                      <button
                        className="text-green-500 border w-1/3 ml-32 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mt-8 mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={() => setClick(false)}
                      >
                        cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Avatar;
