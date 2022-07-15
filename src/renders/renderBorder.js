import i18next from 'i18next';

const renderBorder = (columnType) => {
  const column = document.querySelector(columnType);
  if (column.childNodes.length !== 0) {
    return column;
  }
  const cardBorder = document.createElement('div');
  cardBorder.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = i18next.t(`contents${columnType}`);

  cardBody.append(cardTitle);

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  cardBorder.append(cardBody, ul);

  column.append(cardBorder);

  return column;
};

export default renderBorder;
