import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";

export default dynamic(() => import("@/pageComponent/admin/contact/page"), {
  loading: () => (
    <div className="displayCenter">
      <LoadingChicha />
    </div>
  ),
  ssr: true,
});
