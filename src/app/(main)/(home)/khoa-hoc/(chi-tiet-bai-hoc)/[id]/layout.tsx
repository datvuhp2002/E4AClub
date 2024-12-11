// app/(main)/(home)/khoa-hoc/(course-id)/[id]/layout.tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h4>Đây là page id</h4>
      {children}
    </div>
  );
}
