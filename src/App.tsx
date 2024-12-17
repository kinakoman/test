import { useEffect, useState, useRef } from "react"

const headers = {
  "Content-Type": "application/json",
  "Authorization": "api-auth-password"
}

type API = {
  name: string,
  age: number
}

function App() {
  const [dataList, setdataList] = useState<API[]>([])
  let inputName = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function getData() {
      const rawData: Response = await fetch("http://localhost:5000/", { headers })
      const jsonData: API[] = await rawData.json()

      setdataList(jsonData)
    }
    getData()
    const timer = setInterval(() => {
      getData()
    }, 3000);
    return () => {
      clearInterval(timer)
    }
  }, [])

  function send() {
    if (inputName.current && inputName.current.value != "") {
      const postdata = inputName.current.value
      inputName.current.value = ""
      console.log(inputName.current.value)
      fetch("http://localhost:5000/", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ name: postdata, age: 10 })
      }).then((data) => data.json()).then((data) => {
        setdataList(data)
      })
    }
  }


  return (
    <>
      <div>hello</div>
      {dataList.map((element: API) => {
        return (
          <div>{`${element.name}+${element.age}`}</div>
        )
      })}
      <input ref={inputName} type="text" className="border-solid border-2 border-black"></input>
      {/* <input ref={inputName} type="text" className="border-solid border-2 border-black"></input> */}
      <div className="h-10 w-10 bg-red-800" onClick={() => { send() }}></div>
    </>
  )
}

export default App
