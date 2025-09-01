import LinkBlankCheck from "@/components/LinkBlankCheck";
import TextToCopy from "@/components/TextToCopy";

type TokenDetailParam = {
  name: string;
  key: string;
  render?: (value: any) => React.ReactNode;
};

type TokenDetailsGroup = {
  title: string;
  params: TokenDetailParam[];
};

export const tokenDetailsTabParams: TokenDetailsGroup[] = [
  {
    title: "Blockchain details",
    params: [
      {
        name: "Mint Account",
        key: "mintAccount",
        render: (value: string) => <TextToCopy text={value} />,
      },
      {
        name: "Transaction hash",
        key: "transactionHash",
        render: (value: string) => <TextToCopy text={value} />,
      },
      {
        name: "Network",
        key: "network",
      },
      {
        name: "Royalty",
        key: "royalty",
        render: (value: number) => `${value}%`,
      },
    ],
  },
  {
    title: "Asset Metadata",
    params: [
      {
        name: "Metadata",
        key: "metadata",
        render: (value: string) => <LinkBlankCheck url={value} />,
      },
      {
        name: "IPFS CID",
        key: "ipfsCid",
        render: (value: string) => <TextToCopy text={value} />,
      },
      {
        name: "Version",
        key: "version",
      },
    ],
  },
  {
    title: "System Info",
    params: [
      {
        name: "Created At",
        key: "createdAt",
        render: (value: number) => value.toLocaleString().split("T")[0],
      },
    ],
  },
];
