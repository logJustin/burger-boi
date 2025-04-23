type Props = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: Props) {
  return <p>The Burger ID is {params.slug}</p>;
}
