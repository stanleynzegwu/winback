const CreateCampaign = () => {
  return (
    <div className="max-md:pt-20 p-4 min-h-screen bg-white md:rounded-xl">
      create campaign
      <form action="">
        <div className="">
          <span>Campaign Name</span>
          <input type="text" placeholder="Project Back To school" />
        </div>
        <div className="">
          <span>Description</span>
          <textarea name="" id="" placeholder="Description" />
        </div>
        <div className="">
          <label>Start Date</label>
          <input type="date" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="">Campaign Image</label>
          <input
            type="file"
            name="campaign"
            accept="image/*"
            className="border-[1px] border-[#9D9EA2] focus:outline-none focus:border-[#483EEC] focus:text-[#ffffff] rounded-md p-1 md:p-2"
          />
          {/* {preview.interest && (
            <img
              src={preview.interest}
              alt="Image Preview"
              className="mt-2 rounded-md border border-[#9D9EA2] p-2 h-36 w-36"
            />
          )} */}
        </div>
        <div className="flex gap-2">
          <span>Status</span>
          <div>
            <input type="radio" name="" value="" checked className="cursor-pointer" />
            <label htmlFor="video" className="cursor-pointer">
              Draft
            </label>
          </div>
          <div>
            <input type="radio" name="" value="" checked className="cursor-pointer" />
            <label htmlFor="video" className="cursor-pointer">
              Ongoing
            </label>
          </div>
          <div>
            <input type="radio" name="" value="" checked className="cursor-pointer" />
            <label htmlFor="video" className="cursor-pointer">
              Completed
            </label>
          </div>
        </div>
        <button className="p-2 rounded-xl bg-gray-300">Publish</button>
      </form>
    </div>
  );
};

export default CreateCampaign;
