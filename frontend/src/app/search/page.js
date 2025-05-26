import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";
import { siteMetadata } from "@/config/metadata";

export const metadata = {
  title: siteMetadata.team.title,
  description: siteMetadata.team.description,
  keywords: siteMetadata.team.keywords,
  alternates: siteMetadata.team.alternates,
};

const SearchResultPage = dynamic(() => import("@/pageComponent/search/index"), {
  loading: () => (
    <div className="displayCenter">
      <LoadingChicha />
    </div>
  ),
  ssr: true,
});

export default function Team() {
  return (
    <>
      <SearchResultPage />
    </>
  );
}
