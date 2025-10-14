
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { socialFeed as initialSocialFeed } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Heart, MessageCircle, MoreHorizontal, Send, Share2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils";

type Post = (typeof initialSocialFeed)[0] & { isLiked?: boolean };


export default function SocialPage() {
    const [socialFeed, setSocialFeed] = useState<Post[]>(initialSocialFeed.map(p => ({ ...p, isLiked: false })));
    const [newPostText, setNewPostText] = useState('');
    const currentUserAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar-3');
    const [postToDelete, setPostToDelete] = useState<number | null>(null);

    const handleCreatePost = () => {
        if (newPostText.trim() === '') return;

        const newPost: Post = {
            id: Date.now(),
            user: { name: 'Você', avatarId: 'user-avatar-3' },
            time: 'agora mesmo',
            text: newPostText,
            image: null,
            likes: 0,
            comments: 0,
            isLiked: false
        };

        setSocialFeed([newPost, ...socialFeed]);
        setNewPostText('');
    };

    const confirmDeletePost = () => {
        if (postToDelete !== null) {
            setSocialFeed(socialFeed.filter(post => post.id !== postToDelete));
            setPostToDelete(null);
        }
    };
    
    const handleLikeClick = (postId: number) => {
        setSocialFeed(
            socialFeed.map(post => {
                if (post.id === postId) {
                    const isLiked = !post.isLiked;
                    const likes = isLiked ? post.likes + 1 : post.likes - 1;
                    return { ...post, isLiked, likes };
                }
                return post;
            })
        )
    }


  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Feed Social</h1>
        
        {/* Create Post Card */}
        <Card>
          <CardHeader className="p-4">
            <div className="flex items-center gap-2 md:gap-4">
               <Avatar>
                  {currentUserAvatar && <AvatarImage src={currentUserAvatar.imageUrl} alt="Seu avatar" data-ai-hint={currentUserAvatar.imageHint} />}
                  <AvatarFallback>MA</AvatarFallback>
                </Avatar>
              <Input 
                placeholder="Compartilhe sua conquista..." 
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreatePost()}
                />
              <Button onClick={handleCreatePost} size="icon" className="md:hidden">
                <Send className="h-4 w-4" />
                <span className="sr-only">Postar</span>
              </Button>
               <Button onClick={handleCreatePost} className="hidden md:inline-flex">
                <Send className="mr-2 h-4 w-4" />
                Postar
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
                <div className="flex-1">
                  <p className="font-semibold">{post.user.name}</p>
                  <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
                 {post.user.name === 'Você' && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-5 w-5" />
                                <span className="sr-only">Opções</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                                className="text-destructive"
                                onSelect={() => setPostToDelete(post.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Deletar
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
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
                <Button variant="ghost" className="flex-1" onClick={() => handleLikeClick(post.id)}>
                  <Heart className={cn("mr-2 h-4 w-4", post.isLiked && "fill-red-500 text-red-500")} />
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
      <AlertDialog open={postToDelete !== null} onOpenChange={(open) => !open && setPostToDelete(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
                Esta ação não pode ser desfeita. Isso excluirá permanentemente sua postagem.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPostToDelete(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeletePost} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Deletar
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
