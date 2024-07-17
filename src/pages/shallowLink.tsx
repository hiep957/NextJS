import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const handleShallowRouting = () => {
    // Chuyển đổi URL mà không làm mất trạng thái của trang hiện tại
    router.push('shallowLink/?counter=10', undefined, { shallow: true })
  }

  return (
    <div>
      <h1>Shallow Routing Example</h1>
      <button onClick={handleShallowRouting}>Update URL Shallowly</button>
      <p>Current query: {router.query.counter}</p>
    </div>
  )
}
