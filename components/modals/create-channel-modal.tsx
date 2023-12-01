import axios from "axios";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-model-store";
import { channelSchema, FullServerInfo } from "@/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChannelType } from "@prisma/client";
import qs from "query-string";
import { useEffect, useState } from "react";

const CreateChannelModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const router = useRouter();
  const { server } = data as { server: FullServerInfo };

  const isModalOpen = isOpen && type === "createChannel";

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      type: data.channelType || ChannelType.TEXT,
    },
    resolver: zodResolver(channelSchema),
  });

  //Reinitialize the Form on data changes because of data.channelType
  useEffect(() => {
    form.reset({
      name: "",
      type: data.channelType || ChannelType.TEXT,
    });
  }, [data.channelType, form]);

  const onSubmit = async (values: z.infer<typeof channelSchema>) => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: "/api/channels",
        query: {
          serverId: server?.id,
        },
      });

      const response = await axios.post(url, values);
      form.reset();
      router.refresh();
      onOpen("createChannel", { server: response.data });
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent
        className={"bg-white text-black p-7 max-md:p-5 overflow-hidden"}
      >
        <DialogHeader className={""}>
          <DialogTitle className="text-2xl text-center font-bold">
            Create Channel
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={
                      "uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                    }
                  >
                    Channel Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={
                        "bg-zinc-300/50 focus-visible:ring-0" +
                        "text-black focus-visible:ring-offset-0"
                      }
                      placeholder="Enter channel name"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Channel Type</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                      <SelectValue placeholder="Text" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(ChannelType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className={""}>
              {" "}
              <Button disabled={isLoading} variant={"primary"} type="submit">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelModal;
