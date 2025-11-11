import React from "react";

import img from "../assets/img/stdempimg.gif";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-full p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-2xl mx-auto border">
        <img
          src={img}
          alt="Student"
          className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-blue-500 object-cover"
        />
        <h2 className="text-4xl font-bold ">
          นายนิธิพัฒน์ ภูธนาภานุภิญโญ{" "}
        </h2>
        <p className="text-lg text-gray-500 mt-2 mb-4">
          รหัสนักศึกษา: 67152490
        </p>
        <div className="text-xl text-blue-700 font-semibold">
          <p>ชั้นปีที่ 2</p>
          <p>สาขาวิทยาการคอมพิวเตอร์</p>
          <p>คณะเทคโนโลยีสารสนเทศ</p>
          <p>มหาวิทยาลัยศรีปทุม</p>
        </div>
        <p className="text-gray-600 mt-6 text-center border-t pt-4">สวัสดีครับ</p>
      </div>
    </div>
  );
};

export default Home;
