import { InferGetStaticPropsType } from 'next';
import { ContainerComponent, Layout, PageSeo } from '@/components';
import { wrapper } from '@/stores';
import { getSiteSettings, getPageSettings } from '@/stores/api';
import getRunningGlobalQueries from '@/stores/api/global.api';

const PAGE_SLUG = 'doctors';

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  const siteSettings = await store.dispatch(getSiteSettings.initiate());
  const pageSettings = await store.dispatch(
    getPageSettings.initiate(PAGE_SLUG),
  );

  await Promise.all(store.dispatch(getRunningGlobalQueries()));

  return {
    props: {
      siteSettings: siteSettings.data ?? null,
      pageSettings: pageSettings.data ?? null,
    },
  };
});

const DoctorsPage = ({
  siteSettings,
  pageSettings,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <Layout siteSettings={siteSettings}>
      <PageSeo pageSettings={pageSettings ? pageSettings[0] : null} />
      <ContainerComponent>
        <h1>DoctorsPage</h1>
      </ContainerComponent>
    </Layout>
  );
};

export default DoctorsPage;
