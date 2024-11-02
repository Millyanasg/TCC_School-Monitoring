import { useParentForm } from '@frontend/stores/user/useParentForm';
import { useShallow } from 'zustand/shallow';
import { AddChildForm } from './AddChildForm';
import { AddedChildCard } from './AddedChildCard';

export function ChildrenForm() {
  const childrenList = useParentForm(useShallow((state) => state.children));

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        {childrenList.map((child, index) => (
          <AddedChildCard key={index} child={child} index={index} />
        ))}
      </div>
      <AddChildForm />
    </>
  );
}
