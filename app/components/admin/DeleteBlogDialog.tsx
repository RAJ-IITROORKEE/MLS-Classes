'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteBlogDialogProps {
  blogId: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

export default function DeleteBlogDialog({
  onConfirm,
  onCancel,
  loading,
}: DeleteBlogDialogProps) {
  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <AlertDialog open onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Archive Blog</AlertDialogTitle>
          <AlertDialogDescription>
            This blog will be archived and hidden from public view. You can
            restore it later by changing its status back to Published.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end gap-2">
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={loading}>
            {loading ? 'Archiving...' : 'Archive'}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
