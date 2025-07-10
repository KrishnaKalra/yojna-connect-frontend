import SchemeDetail from "./SchemeDetail";

export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
  const { scheme_id } = await params; 
  return <SchemeDetail params={scheme_id} />;
}