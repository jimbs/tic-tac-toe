import { useState } from "react";

export default function TextInput() {
  const { value, setValue } = useState("123");

  function onChange(e) {
    console.log(setValue);
  }

  return (
    <>
      <input value={value} onChange={onChange} />
    </>
  );
}
