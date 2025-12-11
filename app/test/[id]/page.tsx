export default function Page({ params }: { params: { id: string } }) {
  return <pre>{JSON.stringify(params)}</pre>;
}
