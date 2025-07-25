import { Skeleton } from "@/app/_components/assets/ui/skeleton";

export const SelectedMoviePageSkeleton = () => {
    const genres = [0, 1, 2, 3, 4]
    return (
        <div className="py-16 w-full flex justify-center">
            <div className="w-[1080px] gap-6 flex flex-col relative">
                <div className=" w-full">
                    <div className="flex justify-between gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="text-4xl font-bold">
                                <Skeleton className="w-[250px] h-10" />
                            </div>
                            <div>

                                <Skeleton className="w-[100px] h-4" />
                            </div>
                        </div>
                        <div className="flex flex-col p-2">
                            <p className="text-[12px]">Rating</p>
                            <div className="flex flex-col w-fit">
                                <div className="flex items-center gap-3">
                                    <div>
                                        {/* <YellowStar width={28} height={48} /> */}
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <Skeleton className="w-[100px] h-[20px]" />


                                        <Skeleton className="w-[100px] h-[20px]" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex gap-8">
                        <div>
                            <Skeleton className="w-[290px] h-[428px]" />
                        </div>
                        <div className="relative">
                            <Skeleton className="w-[760px] h-[428px]" />
                            <div className="absolute left-6 bottom-6 ">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex w-fit gap-3">
                        {genres.map((_, i) => {
                            return (
                                <Skeleton key={i} className="w-[67px] h-[22px]" />
                            );
                        })}
                    </div>
                    <Skeleton className="h-[150px] w-full" />
                </div>
                <div className="flex flex-col gap-5 w-full">
                    <div className="flex gap-2 w-full border-b-[1px] border-gray pb-2">
                        <Skeleton className="w-[100px] h-[20px]" />
                        <Skeleton className="w-[300px] h-[20px]" />
                    </div>
                    <div className="flex gap-2 w-full border-b-[1px] border-gray pb-2">
                        <Skeleton className="w-[100px] h-[20px]" />
                        <Skeleton className="w-[300px] h-[20px]" />
                    </div>
                    <div className="flex gap-2 w-full border-b-[1px] border-gray pb-2">
                        <Skeleton className="w-[100px] h-[20px]" />
                        <Skeleton className="w-[300px] h-[20px]" />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-6">
                    <div className="flex justify-between">
                        <Skeleton className="w-[150px] h-[30px]" />
                        <Skeleton className="w-[100px] h-[30px]" />
                    </div>
                    <div className="flex w-full justify-between">
                        {genres.map((_, i) => {
                            return (
                                <Skeleton key={i} className="w-[190px] h-[350px]" />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}