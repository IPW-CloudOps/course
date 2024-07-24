import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Hands-On Docker Experience',
    Svg: require('@site/static/img/k8s_logo_landing.svg').default,
    description: (
      <>
        Dive into containerization with practical Docker exercises. Learn to build, 
        run, and manage containers for efficient application deployment.
      </>
    ),
  },
  {
    title: 'Kubernetes Mastery',
    Svg: require('@site/static/img/k8s_logo_landing.svg').default,
    description: (
      <>
        Gain in-depth knowledge of Kubernetes. From pods to services, learn to 
        orchestrate containers and manage applications at scale.
      </>
    ),
  },
  {
    title: 'Real-World Deployment Strategies',
    Svg: require('@site/static/img/k8s_logo_landing.svg').default,
    description: (
      <>
        Apply your skills to real-world scenarios. Learn best practices for 
        deploying, scaling, and maintaining applications in a cloud-native environment.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
