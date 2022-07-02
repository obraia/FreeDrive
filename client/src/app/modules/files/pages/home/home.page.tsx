import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearAllSelections } from '../../reducers/files.reducer';
import { hideMenu, showMenu } from '../../../../../infrastructure/redux/reducers/contextmenu';
import { Selection } from '../../components/selection';
import { Files } from '../../components/files/files.component';
import { Folders } from '../../components/folders/folders.component';
import { Container } from '../../styles/home.style';
import { setPage } from '../../../../../infrastructure/redux/reducers/pages';
import { getSequencePaths } from '../../../shared/utils/formatters/paths.formatter';
import { FileService } from '../../../../../infrastructure/services/file/file.service';
import { FolderService } from '../../../../../infrastructure/services/folder/folder.service';
import { IFileChild, IFolderChild } from '../../../../../infrastructure/services/folder/interfaces';
import { HomeController } from './home.controller';

const HomePage: React.FC = () => {
  const [files, setFiles] = useState<IFileChild[]>([]);
  const [folders, setFolders] = useState<IFolderChild[]>([]);

  const dispatch = useDispatch();
  const inputFile = useRef<HTMLInputElement>(null);

  const { id: parentId = '62bbc4d7edf858e4c6a9b98a' } = useParams();

  const controller = new HomeController({
    userId: '62ba0237ca20daae241e8737',
    parentId,
    inputFile,
    fileService: new FileService(),
    folderService: new FolderService(),
    clearSelection: () => dispatch(clearAllSelections()),
    hideContextMenu: () => dispatch(hideMenu()),
    showContextMenu: (p) => dispatch(showMenu(p)),
    onFilesUploaded: (f) => setFiles((files) => [...files, ...f]),
    onFilesDeleted: (ids) => setFiles((f) => f.filter((f) => !ids.includes(f._id))),
    onFilesFavorited: (ids, favorite) => {
      setFiles((f) => f.map((f) => ({ ...f, favorite: ids.includes(f._id) ? favorite : f.favorite })));
    },
    onFoldersUploaded: (f) => setFolders((folders) => [...folders, ...f]),
    onFoldersDeleted: (ids) => setFolders((f) => f.filter((f) => !ids.includes(f._id))),
    onFoldersFavorited: (ids, favorite) => {
      setFolders((f) => f.map((f) => ({ ...f, favorite: ids.includes(f._id) ? favorite : f.favorite })));
    },
  });

  //!!! TODO: implementar useMemo
  const renderContent = () => {
    const hasFiles = files.length > 0;
    const hasFolders = folders.length > 0;

    return hasFiles || hasFolders ? (
      <>
        {hasFolders && (
          <Folders
            folders={folders}
            handleFavorite={controller.handleFavorite.bind(controller)}
            handleDownload={controller.handleDownload.bind(controller)}
            handleDelete={controller.handleDelete.bind(controller)}
          />
        )}
        {hasFiles && (
          <Files
            files={files}
            handleFavorite={controller.handleFavorite.bind(controller)}
            handleDownload={controller.handleDownload.bind(controller)}
            handleDelete={controller.handleDelete.bind(controller)}
          />
        )}
      </>
    ) : (
      <div />
    );
  };

  useEffect(() => {
    controller.onMount((folder) => {
      dispatch(
        setPage({
          title: folder?.folderName + ' - Free Drive',
          pathSequence: getSequencePaths(folder),
        })
      );

      setFiles(folder?.files || []);
      setFolders(folder?.children || []);
    });

    return () => {
      controller.onUnmount();
    };
  }, [parentId]);

  return (
    <Selection>
      <Container id='home-page' onContextMenu={controller.handleContextMenu.bind(controller)}>
        {renderContent()}
        <input id='uploader' title='files' type='file' ref={inputFile} />
      </Container>
    </Selection>
  );
};

export { HomePage };
