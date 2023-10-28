'use client'
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Server name is required."
    }),
    // imageUrl: z.string().min(1, {
    //     message: "Server image is required."
    // })
});

const InitialModal = () => {
    const form = useForm({
        defaultValues: {
            name: '',
            imageUrl: ''
        },
        resolver: zodResolver(formSchema)
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

    return (
        <Dialog open={true}>
            <DialogContent className={'bg-white text-black p-7 max-md:p-5 overflow-hidden'}>
                <DialogHeader className={''}>
                    <DialogTitle className='text-2xl text-center font-bold'>Customize your server</DialogTitle>
                    <DialogDescription className={'text-center text-zinc-500'}>
                        Give your server a personality with a name and an image. You can always change it later.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className={'space-y-8 px-6'}>
                            <div className={'flex items-center justify-center text-center'}> TODO: Image Upload</div>
                        </div>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={'uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'}>Server Name</FormLabel>
                                    <FormControl>
                                        <Input className={'bg-zinc-300/50 focus-visible:ring-0' +
                                            'text-black focus-visible:ring-offset-0'} placeholder="Enter server name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Give your server a unique name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className={''}> <Button variant={"primary"} type="submit">Submit</Button></DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default InitialModal;

