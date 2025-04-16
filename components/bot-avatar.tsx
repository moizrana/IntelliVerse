import {Avatar, AvatarImage} from "@/components/ui/avatar";

export const BotAvatar = () => {
    return(
        <Avatar className="h-8 w-8">
            <AvatarImage className="object-cover h-full w-full p-0 scale-140" src="/logo.png" />
        </Avatar>
    )
}