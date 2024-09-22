// const CreateCampaign = () => {
//   return (
//     <div className="max-md:pt-20 p-4 min-h-screen bg-white md:rounded-xl">
//       create campaign
//       <form action="" className="flex flex-col gap-4">
//         <div className="flex flex-col gap-2">
//           <label className="text-sm font-semibold">Campaign Name</label>
//           <input
//             type="text"
//             placeholder="Project Back To school"
//             className="border-[1px] border-gray-500 rounded-xl px-2 py-2 focus:outline-none focus:border-[#483EEC] focus:text-gray-500"
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <label className="text-sm font-semibold">Description</label>
//           <textarea
//             name=""
//             id=""
//             placeholder="Description"
//             className="border-[1px] border-gray-500 rounded-xl px-2 py-2 focus:outline-none focus:border-[#483EEC] focus:text-gray-500"
//           />
//         </div>
//         <div className="">
//           <label>Start Date</label>
//           <input type="date" />
//         </div>
//         <div className="flex flex-col gap-2">
//           <label className="">Campaign Image</label>
//           <input
//             type="file"
//             name="campaign"
//             accept="image/*"
//             className="border-[1px] border-[#9D9EA2] focus:outline-none focus:border-[#483EEC] focus:text-[#ffffff] rounded-md p-1 md:p-2"
//           />
//           {/* {preview.interest && (
//             <img
//               src={preview.interest}
//               alt="Image Preview"
//               className="mt-2 rounded-md border border-[#9D9EA2] p-2 h-36 w-36"
//             />
//           )} */}
//         </div>
//         <div className="flex flex-col gap-2">
//           <label className="text-sm font-semibold">Status</label>
//           <div className="flex gap-4">
//             <div>
//               <input type="radio" name="" value="" checked className="cursor-pointer" />
//               <label htmlFor="video" className="cursor-pointer">
//                 Draft
//               </label>
//             </div>
//             <div>
//               <input type="radio" name="" value="" checked className="cursor-pointer" />
//               <label htmlFor="video" className="cursor-pointer">
//                 Ongoing
//               </label>
//             </div>
//             <div>
//               <input type="radio" name="" value="" checked className="cursor-pointer" />
//               <label htmlFor="video" className="cursor-pointer">
//                 Completed
//               </label>
//             </div>
//           </div>
//         </div>
//         <button className="self-end w-60 px-2 py-3 rounded-2xl bg-[#483EEC] text-white">
//           Publish
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateCampaign;

const CreateCampaign = () => {
  // Add state to handle image preview
  // const [preview, setPreview] = React.useState(null);

  return (
    <div className="max-md:pt-20 p-4 min-h-screen bg-white md:rounded-xl">
      <h1 className="uppercase text-lg lg:text-2xl text-center mb-8">Create campaign</h1>
      <form action="" className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Campaign Name</label>
          <input
            type="text"
            placeholder="Project Back To school"
            className="border-[1px] border-gray-400 rounded-xl px-2 py-2 focus:outline-none focus:border-[#483EEC] focus:text-gray-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Description</label>
          <textarea
            placeholder="Description"
            className="border-[1px] border-gray-400 rounded-xl px-2 py-2 focus:outline-none focus:border-[#483EEC] focus:text-gray-500"
          />
        </div>

        {/* Styled Date Picker */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Start Date</label>
          <input
            type="date"
            className="border-[1px] border-gray-400 rounded-xl px-2 py-2 focus:outline-none focus:border-[#483EEC] focus:text-gray-500"
          />
        </div>

        {/* Image Upload and Preview */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Campaign Image</label>
          <input
            type="file"
            name="campaign"
            accept="image/*"
            className="border-[1px] border-gray-400 rounded-xl px-2 py-2 cursor-pointer focus:outline-none focus:border-[#483EEC] focus:text-gray-500"
          />
          {/* Image preview */}
          {true && (
            <img
              src={"/images/african-headshot1.png"}
              alt="Image Preview"
              className="mt-4 max-w-xs h-60 aspect-square rounded-xl border-[1px] border-gray-300"
            />
          )}
        </div>

        {/* Radio buttons */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Status</label>
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <input type="radio" name="status" value="draft" className="cursor-pointer" />
              <label className="cursor-pointer">Draft</label>
            </div>
            <div className="flex items-center gap-1">
              <input type="radio" name="status" value="ongoing" className="cursor-pointer" />
              <label className="cursor-pointer">Ongoing</label>
            </div>
            <div className="flex items-center gap-1">
              <input type="radio" name="status" value="completed" className="cursor-pointer" />
              <label className="cursor-pointer">Completed</label>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <button className="self-end w-full md:w-60 px-2 py-3 rounded-2xl bg-[#483EEC] text-white">
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;
