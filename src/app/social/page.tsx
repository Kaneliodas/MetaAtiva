
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { socialFeed } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Heart, MessageCircle, Send, Share2 } from "lucide-react";
import Image from "next/image";

export default function SocialPage() {
    const currentUserAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar-3');
  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Feed Social</h1>
        
        {/* Create Post Card */}
        <Card>
          <CardHeader className="p-4">
            <div className="flex items-center gap-4">
               <Avatar>
                  {currentUserAvatar && <AvatarImage src={currentUserAvatar.imageUrl} alt="Seu avatar" data-ai-hint={currentUserAvatar.imageHint} />}
                  <AvatarFallback>MA</AvatarFallback>
                </Avatar>
              <Input placeholder="Compartilhe sua conquista..." />
              <Button>
                <Send className="h-4 w-4" />
                <span className="sr-only">Postar</span>
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Feed */}
        {socialFeed.map((post) => {
          const userAvatar = PlaceHolderImages.find(
            (p) => p.id === post.user.avatarId
          );
          const postImage = post.image
            ? PlaceHolderImages.find((p) => p.id === post.image.id)
            : null;

          return (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-4 p-4">
                <Avatar>
                  {userAvatar && (
                    <AvatarImage
                      src={userAvatar.imageUrl}
                      alt={post.user.name}
                      data-ai-hint={userAvatar.imageHint}
                    />
                  )}
                  <AvatarFallback>
                    {post.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{post.user.name}</p>
                  <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="mb-4">{post.text}</p>
                {postImage && (
                  <div className="aspect-video relative rounded-lg overflow-hidden border">
                    <Image
                      src={postImage.imageUrl}
                      alt="Imagem do post"
                      data-ai-hint={postImage.imageHint}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-2 bg-muted/50 flex justify-around">
                <Button variant="ghost" className="flex-1">
                  <Heart className="mr-2 h-4 w-4" />
                  {post.likes}
                </Button>
                <Button variant="ghost" className="flex-1">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {post.comments}
                </Button>
                <Button variant="ghost" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartilhar
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
