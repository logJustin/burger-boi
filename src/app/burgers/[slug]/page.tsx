export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  return <p>The Burger ID is {slug}</p>;
}
