import React, { useEffect, useState } from 'react';
import PopupWindow from '@/components/PopupWindow';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import {
  BoldText,
  DeleteConfirmButton,
  DeleteConfirmButtonGroup,
  DeleteConfirmContainer,
  DeleteConfirmText,
  DeleteConfirmTitle,
  EditingTagForm,
  EditingTagInput,
  EmptyContainer,
  EmptyContent,
  EmptyMessage,
  InfoHeader,
  InfoList,
  InfoListItem,
  InfoSubheader,
  InfoTextBox,
  MiddleContainer,
  SearchContainer,
  SearchInput,
  SingleTag,
  SingleTagDelete,
  TagBodyContainer,
  TagDisplayContainer,
  TagEventContainer,
  TagEventHeader,
  TagInfoContainer,
} from '@/styles/components/Event/eventTagPopupWindow.styles';
import { QueriedTagData } from 'bookem-shared/src/types/database';
import useSWR from 'swr';
import { ObjectId } from 'mongodb';

const TagEventPopupWindow = ({
  setShowPopup,
}: {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data, isLoading } = useSWR<QueriedTagData[]>('/api/tags/', fetcher);

  const [showInfo, setShowInfo] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allTags, setAllTags] = useState<QueriedTagData[]>([]);
  const [filteredTags, setFilteredTags] = useState<QueriedTagData[]>([]);
  //for edit tag
  const [editingTag, setEditingTag] = useState<QueriedTagData | undefined>(
    undefined
  );
  const [newTagName, setNewTagName] = useState('');

  //for delete confirmation
  // const [deleteTag, setDeleteTag] = useState('');
  // const [showConfirm, setShowConfirm] = useState(false);
  // const [confirmPosition, setConfirmPosition] = useState({ x: 0, y: 0 });
  const handleDeleteIconClick = async (tagName: string, tagId: ObjectId) => {
    if (window.confirm(`Are you sure to delete: ${tagName}?`)) {
      console.log('OK BRO');
      const res = await fetch(`/api/tags/${tagId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        alert('Tag deleted successfully');
      } else {
        alert('error deleting tag');
      }
    }
  };

  useEffect(() => {
    if (!isLoading && data) {
      setAllTags(data);
      setFilteredTags(data);
    }
  }, [data, isLoading]);

  const handleSearch = (query: string) => {
    const filtered = allTags.filter(tag =>
      tag.tagName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTags(filtered);
  };

  const handleCreateTag = async () => {
    const query = searchQuery;
    if (query.length > 0) {
      //check if there is already a tag with tagName 'query'
      if (!allTags.some(tag => tag.tagName === query)) {
        const res = await fetch('/api/tags', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tagName: query }),
        });
        if (res.ok) {
          const newTag = await res.json();
          alert('New tag is successfully created.');
        } else {
          throw new Error('Fail to create new tag');
        }
      } else {
        alert('This tag already exists!');
      }
    }
  };

  const handleEditTag = async (tagId: ObjectId) => {
    const res = await fetch(`/api/tags/${tagId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newTagName }),
    });
    if (res.ok) {
      setNewTagName('');
      setEditingTag(undefined);
      alert('Tag edited successfully');
    } else {
      alert('error editing tag');
    }
  };

  const cancelEdit = () => {
    // Set a new timeout to delay the execution of onMouseLeave logic
    setTimeout(() => {
      setNewTagName('');
      setEditingTag(undefined);
    }, 500);
  };

  return (
    <PopupWindow hidePopup={() => setShowPopup(false)}>
      <TagEventContainer>
        {/* {showConfirm && (
          <DeleteConfirmContainer
            style={{
              top: confirmPosition.y - 120,
              left: confirmPosition.x,
            }}>
            <DeleteConfirmTitle>Are you sure?</DeleteConfirmTitle>
            <DeleteConfirmText>
              Confirmation to delete tag: {deleteTag}
            </DeleteConfirmText>
            <DeleteConfirmButtonGroup>
              <DeleteConfirmButton>Cancel</DeleteConfirmButton>
              <DeleteConfirmButton>Delete</DeleteConfirmButton>
            </DeleteConfirmButtonGroup>
          </DeleteConfirmContainer>
        )} */}
        <TagEventHeader>Manage tags</TagEventHeader>
        <TagBodyContainer>
          {showInfo && (
            <TagInfoContainer>
              <InfoTextBox>
                <InfoHeader>Tips</InfoHeader>
                <InfoSubheader>How to use this page?</InfoSubheader>
                <InfoList>
                  <InfoListItem>Tags are categories of events.</InfoListItem>
                  <InfoListItem>
                    To create <BoldText>new</BoldText> tags: enter tag names and
                    click check mark.
                  </InfoListItem>
                  <InfoListItem>
                    To <BoldText>edit</BoldText> existing tags: double click a
                    tag and modify.
                  </InfoListItem>
                  <InfoListItem>
                    To <BoldText>delete</BoldText> a tag: hover over a tag and
                    click the trash icon.
                  </InfoListItem>
                </InfoList>
              </InfoTextBox>
            </TagInfoContainer>
          )}

          <MiddleContainer>
            <SearchContainer>
              <Image
                onMouseOver={() => setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)}
                src="/event/info.svg"
                alt="info button"
                width="20"
                height="20"
              />
              <SearchInput
                placeholder="Enter tag name here..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchQuery(e.target.value);
                  handleSearch(e.target.value);
                }}
              />
              <Image
                onClick={handleCreateTag}
                src="/event/check-submit.svg"
                alt="submit tag"
                width="30"
                height="30"
              />
            </SearchContainer>

            <TagDisplayContainer>
              {filteredTags.length > 0 ? (
                filteredTags.map((tag, index) => (
                  <SingleTag
                    key={index}
                    onDoubleClick={() => {
                      setNewTagName('');
                      setEditingTag(tag);
                    }}
                    onMouseLeave={() => {
                      cancelEdit();
                    }}>
                    {editingTag === tag ? (
                      <EditingTagForm
                        onSubmit={e => {
                          e.preventDefault();
                          handleEditTag(tag._id);
                        }}>
                        <EditingTagInput
                          placeholder="Type in new name and hit enter"
                          value={newTagName}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setNewTagName(e.target.value);
                          }}
                        />
                      </EditingTagForm>
                    ) : (
                      <>
                        <span>{tag.tagName}</span>
                        <SingleTagDelete>
                          <Image
                            src="/event/trash.svg"
                            alt="delete tag"
                            height="25"
                            width="25"
                            // onClick={() => setShowConfirm(!showConfirm)}
                            onClick={() =>
                              handleDeleteIconClick(tag.tagName, tag._id)
                            }
                          />
                        </SingleTagDelete>
                      </>
                    )}
                  </SingleTag>
                ))
              ) : (
                <EmptyContainer>
                  <EmptyContent>
                    <Image
                      src="/./event/folder-dashed.svg"
                      alt="no tags"
                      width="150"
                      height="150"
                    />
                    <EmptyMessage>No tag</EmptyMessage>
                    <EmptyMessage>Click check mark to create new</EmptyMessage>
                  </EmptyContent>
                </EmptyContainer>
              )}
            </TagDisplayContainer>
          </MiddleContainer>
        </TagBodyContainer>
      </TagEventContainer>
    </PopupWindow>
  );
};

export default TagEventPopupWindow;
