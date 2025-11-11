import React from 'react';

import Adder from "../Components/Adder";
import Temperatures from "../Components/Temperatures";
import Timer from '../Components/Timer';
import Value from '../Components/Value';

const Components = () => {
  return (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">

     <div className="flex flex-col items-center justify-start gap-4 w-full">
          <Value />
          <Timer />
        </div>
        
         <div className="flex justify-center items-start w-full">
          <Adder />
        </div>

         <div className="lg:col-span-2 flex justify-center w-full">
          <Temperatures />
        </div>

    </div>
  );
};

export default Components;
