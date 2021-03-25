export default function (time) {
  const datetime = new Date(time * 1000)
  return datetime.toLocaleDateString('zh-TW', { month: '2-digit', day: '2-digit', year: 'numeric' })
}
