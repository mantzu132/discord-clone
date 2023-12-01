"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import qs from "query-string";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FileUpload } from "@/components/FileUpload";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-model-store";

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: "Attachment is required.",
  }),
});
const MessageFileModal = () => {
  const { isOpen, data, type, onClose } = useModal();

  const router = useRouter();

  const { apiUrl, query } = data;

  const isModalOpen = isOpen && type === "messageFile";

  const form = useForm({
    defaultValues: {
      fileUrl: "",
    },
    resolver: zodResolver(formSchema),
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      });

      await axios.post(url, {
        ...values,
        content: values.fileUrl,
      });

      form.reset();
      router.refresh();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent
        className={"bg-white text-black p-7 max-md:p-5 overflow-hidden"}
      >
        <DialogHeader className={""}>
          <DialogTitle className="text-2xl text-center font-bold">
            Add an attachment
          </DialogTitle>
          <DialogDescription className={"text-center text-zinc-500"}>
            Send a file as a message.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              name="fileUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <div className="flex flex-center justify-center">
                        <FileUpload
                          endpoint="messageFile"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </div>
                      {form.formState.errors.fileUrl && (
                        <p className="text-sm font-medium text-destructive">
                          {form.formState.errors.fileUrl.message}
                        </p>
                      )}
                    </>
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className={""}>
              {" "}
              <Button variant={"primary"} type="submit">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageFileModal;
