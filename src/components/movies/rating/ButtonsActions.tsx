import { cache, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Eye, Heart, Loader2 } from "lucide-react";

import kyInstance from "@/lib/ky";
import WatchlistButton from "./WatchlistButton";
import { useSession } from "@/app/(main)/SessionProvider";
import WatchedButton from "./WatchedButton";
import LikeButton from "./LikeButton";
import { LikedInfo, WatchedInfo } from "@/lib/types";

interface ButtonActionsProps {
  movieId: string;
  watchlist: { userId: string; movieId: string }[];
  reviews: {
    userId: string;
    movieId: string;
    liked: boolean;
    watched: boolean;
  }[];
}

export default function ButtonActions({
  movieId,
  watchlist,
  reviews,
}: ButtonActionsProps) {
  const { user } = useSession();

  const isWatchedByUser = reviews
    ? reviews.some(
        (movie) =>
          movie.userId === user.id &&
          movie.movieId === movieId &&
          movie.watched
      )
    : false;

  const isLikedByUser = reviews
    ? reviews.some(
        (movie) =>
          movie.userId === user.id &&
          movie.movieId === movieId &&
          movie.liked,
      )
    : false;

  const isInWatchlistByUser = watchlist
    ? watchlist.some(
        (movie) => movie.userId === user.id && movie.movieId === movieId,
      )
    : false;

  return (
    <div className="flex justify-around">
      <WatchedButton
        movieId={movieId}
        initialState={{
          isWatchedByUser
        }}
      />
      <LikeButton
        movieId={movieId}
        initialState={{
          isLikedByUser,
        }}
      />
      <WatchlistButton
        movieId={movieId}
        initialState={{
          isAddToWatchlistByUser: isInWatchlistByUser,
        }}
      />
    </div>
  );
}
