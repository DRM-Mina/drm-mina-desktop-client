'use client';
import { useState, useEffect } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

import RatingDisplay from './ratingDisplay';
import Jazzicon from 'react-jazzicon';

import { useGamesStore } from '../lib/stores/gameStore';
import { base58Decode } from '../lib/utils';
import { fetchComments } from '../lib/api';

export default function CommentSection({ game }: { game: Game }) {
  const [comments, setComments] = useState<IComment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [totalComments, setTotalComments] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [postTrigger, setPostTrigger] = useState(false);
  const gameStore = useGamesStore();

  useEffect(() => {
    const loadComments = async () => {
      setIsLoading(true);
      try {
        const { comments, totalComments, totalPages } = await fetchComments(
          game.gameId,
          currentPage,
          currentLimit,
        );

        setComments(comments);
        setTotalPages(totalPages);
        setTotalComments(totalComments);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();
  }, [game.gameId, currentPage, postTrigger]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Comments ( {totalComments} )
      </h2>
      <Separator />
      <div className="mt-6 space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="flex space-x-4">
              <Avatar>
                <Jazzicon
                  diameter={40}
                  seed={base58Decode(comment.user.publicKey)}
                />
              </Avatar>
              <div className="flex flex-col gap-1 items-start">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">
                    {comment.user.publicKey.slice(0, 4) +
                      ' ... ' +
                      comment.user.publicKey.slice(-4)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <RatingDisplay rating={comment.rating} decimals={false} />
                <p>{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
        {isLoading && <p>Loading comments...</p>}
      </div>
      {currentPage <= totalPages && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage((prevPage) => prevPage - 1);
                    setPostTrigger((prev) => !prev);
                  }
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive={false}>{currentPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (currentPage < totalPages) {
                    setCurrentPage((prevPage) => prevPage + 1);
                    setPostTrigger((prev) => !prev);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
