import React, { useState } from 'react';
import { Dialog, DialogContent, IconButton, Box, TextField, Chip, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function SearchComponent({ open, onClose }) {
  const [searchValue, setSearchValue] = useState('');
  const [selectedTags, setSelectedTags] = useState([]); // Array to manage multiple selected tags
  const tags = ['Usernames','Photos', 'Videos', 'Documents', 'Music']; // Example tags

  const handleChipClick = (tag) => {
    // Add the tag if it's not already selected
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    // Remove the tag from the selected list
    setSelectedTags((tags) => tags.filter((tag) => tag !== tagToDelete));
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translate(-50%, 0)',
          margin: 0,
          borderRadius: 2,
          backgroundColor: 'background.paper'
        }
      }}
    >
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <TextField
            autoFocus
            fullWidth
            placeholder="Search..."
            variant="outlined"
            value={searchValue}
            onChange={handleInputChange}
            slotProps={{
              input: {
                startAdornment: (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedTags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        onDelete={() => handleDeleteTag(tag)}
                        size="small"
                        sx={{ marginRight: 0.5 }}
                      />
                    ))}
                  </Box>
                ),
              },
            }}
          />
        </Box>
        {/* Display the Chips Below the TextField for Additional Tagging */}
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onClick={() => handleChipClick(tag)}
              sx={{ cursor: 'pointer' }}
              color={selectedTags.includes(tag) ? 'primary' : 'default'}
            />
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}