import { useState } from "react";
import { MdContentCopy } from "react-icons/md";

function Coupons() {
  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>("");
  const [copyMsg, setCopyMsg] = useState<string>("");

  const generateCoupon = () => {
    const numbers = "1234567890";
    const symbols = "!@#$%^&*";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (!includeNumbers && !includeCharacters && !includeSymbols)
      return alert("Please select at least one option");

    if (prefix.length > size)
      return alert(
        "Please increase length to add some charcters to your coupon prefix."
      );

    let entireString: string = "";
    let result: string = "";
    if (includeCharacters) entireString += characters;
    if (includeSymbols) entireString += symbols;
    if (includeNumbers) entireString += numbers;
    const length = Math.abs(prefix.length - size);
    console.log(length);

    for (let i = 0; i < length; i++) {
      const randomNum: number = ~~(Math.random() * entireString.length);
      result += entireString[randomNum];
    }
    setCoupon(prefix + result);
  };
  const handleCopyClick = () => {
    navigator.clipboard.writeText(coupon);
    setCopyMsg("Copied!!");
  };
  return (
    <div className="lg:col-span-4 overflow-y-scroll">
      <div className="bg-white col-span-3 xsm:rounded xsm:shadow sm:px-8 sm:py-7 p-4 xsm:m-3 sm:m-6 ">
        <h2 className="font-semibold text-3xl">Generate Coupons</h2>
        <div className="flex justify-center items-center w-full h-[80vh] ">
          <div className="w-[400px] space-y-6">
            <input
              type="text"
              placeholder="Enter Prefix"
              className="border px-2 py-1 rounded mx-2"
              value={prefix}
              onChange={(e) => {
                setPrefix(e.target.value);
              }}
            />
            <input
              type="number"
              className="border px-2 py-1 rounded mx-2"
              min={8}
              max={25}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
            />
            <fieldset className="flex xsm:items-center xsm:justify-around xsm:flex-row flex-col border rounded mx-2 p-1">
              <legend className="ml-3">Include</legend>
              <div>
                <input
                  type="checkbox"
                  value={String(includeNumbers)}
                  onChange={() => setIncludeNumbers(!includeNumbers)}
                />
                <span className="ml-2">Number</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  value={String(includeCharacters)}
                  onChange={() => setIncludeCharacters(!includeCharacters)}
                />
                <span className="ml-2">Characters</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  value={String(includeSymbols)}
                  onChange={() => setIncludeSymbols(!includeSymbols)}
                />
                <span className="ml-2">Symbols</span>
              </div>
            </fieldset>

            <button className="btn-primary" onClick={generateCoupon}>
              Generate Coupon
            </button>
            {coupon && (
              <div className="flex justify-center items-center">
                <code className="text-center block">{coupon} </code>
                <div title="Copy" className="ml-5">
                  <MdContentCopy onClick={handleCopyClick} />
                </div>
              </div>
            )}
            <div className="text-center text-green-500">{copyMsg}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coupons;
