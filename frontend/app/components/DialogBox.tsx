import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { ReactNode } from "react";

interface DialogBoxProps {
  children: ReactNode;
  func: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  confirmMessage: string;
}
const DialogBox = ({ children, func, confirmMessage }: DialogBoxProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>{confirmMessage}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e?.stopPropagation()}>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction onClick={func}>Delete</AlertDialogAction> */}
          <AlertDialogAction onClick={(e) => func(e)}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogBox;
