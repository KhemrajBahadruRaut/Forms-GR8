

const Additional = ({ data, setData }) => {


  return (
    
    <div>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>

        {/* Admired Accounts */}
        <div>
          <label className="block text-sm font-medium">
            Are there any social media accounts that you admire?
          </label>
          <div className="flex mt-2">
            {["yes", "no"].map((option) => (
              <div key={option} className="flex items-center pr-6">
                <input
                  id={`social-${option}`}
                  type="radio"
                  name="admireAccounts"
                  value={option}
                  checked={data.admireAccounts === option}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      admireAccounts: e.target.value,
                    }))
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor={`social-${option}`}
                  className="ms-2 text-sm font-medium"
                >
                  {option === "yes" ? "Yes" : "No"}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Textareas */}
        <div className="space-y-4 mt-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              List any competitors you'd like us to review or differentiate from:
            </label>
            <textarea
              rows={2}
              value={data.competitors}
              onChange={(e) =>
                setData((prev) => ({ ...prev, competitors: e.target.value }))
              }
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Any upcoming launches, events, or promotions?
            </label>
            <textarea
              rows={2}
              value={data.upcomingLaunches}
              onChange={(e) =>
                setData((prev) => ({ ...prev, upcomingLaunches: e.target.value }))
              }
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Anything else we should know to best support your business?
            </label>
            <textarea
              rows={2}
              value={data.otherInfo}
              onChange={(e) =>
                setData((prev) => ({ ...prev, otherInfo: e.target.value }))
              }
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Additional;
