type Props = { title: string; message: string }

export default function SuccessScreen({ title, message }: Props) {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">
      <div className="text-4xl">✓</div>
      <h2 className="font-heading text-2xl">{title}</h2>
      <p className="font-body text-sm text-gray-500">{message}</p>
    </div>
  )
}
