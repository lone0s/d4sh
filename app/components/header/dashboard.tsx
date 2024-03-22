import React from 'react';
import styled from 'styled-components';

// Styles pour l'en-tête
const HeaderContainer = styled.div`
  background-color: transparent; /* rendre l'en-tête transparent */
  color: #000; /* texte noir */
  padding: 20px;
  display: flex;
  justify-content: center; /* centrer le contenu horizontalement */
  align-items: center;
  margin-bottom: 10px; /* Ajoutez une marge en bas pour séparer de la suite du contenu */
`;

const Title = styled.h1`
  margin: 0;
`;

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
      {/* Ajoutez d'autres éléments d'en-tête ici si nécessaire */}
    </HeaderContainer>
  );
};

export default DashboardHeader;
