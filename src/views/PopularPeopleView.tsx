import React from 'react';
import PersonCard from '@/people-listing/PersonCard';
import InfiniteGridList from '@/common/InfiniteGridList';
import BaseSeo from '@/seo/BaseSeo';
import { Person, InfiniteFetchResponse } from '@/common/CommonTypes';
import { withGetServerSideError } from '@/error-handling/withGetServerSideError';
import { dehydrate, useInfiniteQuery } from 'react-query';
import { getAllPageResults } from '@/common/CommonUtils';
import { apiQueries } from '@/http-client/apiQueries';
import { createQueryClient } from '@/http-client/queryClient';
import PageTitle from '@/common/PageTitle';

function renderItem(person: Person) {
  return (
    <li>
      <PersonCard person={person} />
    </li>
  );
}

function PopularPeopleView() {
  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery<
    InfiniteFetchResponse<Person>
  >(apiQueries.people.popularPeople());

  return (
    <>
      <BaseSeo title="Popular People" description="Popular people list" />
      <PageTitle title="Popular People" />
      <InfiniteGridList
        items={getAllPageResults(data)}
        loading={isFetching}
        hasNextPage={!!hasNextPage}
        onLoadMore={fetchNextPage}
        renderItem={renderItem}
      />
    </>
  );
}

export const getServerSideProps = withGetServerSideError(async () => {
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.fetchQuery(apiQueries.common.configuration()),
    queryClient.fetchInfiniteQuery(apiQueries.people.popularPeople()),
  ]);

  return {
    props: {
      // There is an issue when we use infinite query while SSR.
      // So, we use this workaround.
      // https://github.com/tannerlinsley/react-query/issues/1458
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
});

export default PopularPeopleView;
