import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const emojiPages = [
  ['😀', '😎', '🔥', '💡', '🌟', '🎉', '🚀', '❤️', '🍀', '🎵', '📚', '🖥️', '🛠️', '☀️', '🌙'],
  ['🌈', '❄️', '⚡', '🦄', '🍎', '🍕', '🐱', '🐶', '🎂', '🍇', '🌍', '🏔️', '🏖️', '🚗', '✈️'],
  ['🏆', '⚽', '🎹', '🎸', '🎮', '📷', '📱', '💻', '🔑', '🖊️', '📎', '📔', '🗂️', '📦', '🖼️'],
];

const EmojiSelector = ({ onSelect }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % emojiPages.length);
  };

  const handleSelect = (emoji) => {
    setSelectedEmoji(emoji);
    onSelect(emoji);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        cursor: selectedEmoji
          ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ctext x='0' y='24' font-size='24'%3E${encodeURIComponent(
              selectedEmoji
            )}%3C/text%3E%3C/svg%3E"), auto`
          : 'auto',
      }}
    >
      {/* Draggable Sticker */}
      <Box
        sx={{
          position: 'fixed',
          top: dragPosition.y,
          left: dragPosition.x,
          fontSize: '32px',
          pointerEvents: 'none',
          visibility: selectedEmoji ? 'visible' : 'hidden',
        }}
        onTouchMove={(e) => {
          const touch = e.touches[0];
          setDragPosition({ x: touch.clientX, y: touch.clientY });
        }}
      >
        {selectedEmoji}
      </Box>

      {/* Emoji Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          gap: '2px',
          justifyItems: 'center',
        }}
      >
        {emojiPages[currentPage].map((emoji, index) => (
          <IconButton
            key={index}
            onClick={() => handleSelect(emoji)}
            sx={{
              fontSize: '24px',
              width: '44px',
              height: '44px',
              color: 'text.primary',
              '&:hover': {
                transform: 'scale(1.2)',
                color: 'primary.main',
              },
            }}
          >
            {emoji}
          </IconButton>
        ))}
      </Box>

      {/* Navigation */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 1,
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mr: 0.5, fontSize: '0.8rem' }}>
          More Emojis
        </Typography>
        <IconButton
          onClick={handleNextPage}
          sx={{
            padding: 0.5,
            color: 'text.primary',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default EmojiSelector;